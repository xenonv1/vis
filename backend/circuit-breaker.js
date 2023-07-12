let maxConsecutiveFailures = 5; // determines how many back-to-back errors will be allowed before tripping
let maxFailureRate = 50; // determines how many failures (in %) within the maxRequests window will be allowed before tripping
let maxRecoveryRequests = 3; // determines how many requests should be allowed for recovery from open state
let recoveryTime = 10000; // determines the time the circuit breaker will stay in open state (in ms)
let maxRequestWindow = 100; // determines how many requests should be consideres for calculating failure rate
let minRequests = 10; // determines how many requests will be made before the circuit breaker can trip the first time
let requests = []; // stores if a request was successfully or a failure for the last requests (maximum to maxRequestWindow)
let consecutiveFailures = 0;
let recoveryRequests = 0;
let failureRate = 0;
let cbStatus = "closed";
let response;

/* todo: 
    - failure rate muss resettet werden um nicht beim ersten recovery request sofort wieder in den timeout zu laufen
    - requests darf nicht geleert werden, da sonst mindestens 10 requests durchlaufen um von half-open auf closed bzw open zu welchseln
*/

function setParameters({
  maxConsecutiveFailures,
  maxFailureRate,
  maxRecoveryRequests,
  recoveryTime,
  maxRequestWindow,
  minRequests,
}) {
  this.maxConsecutiveFailures = maxConsecutiveFailures;
  this.maxFailureRate = maxFailureRate;
  this.maxRecoveryRequests = maxRecoveryRequests;
  this.recoveryTime = recoveryTime;
  this.maxRequestWindow = maxRequestWindow;
  this.minRequests = minRequests;
}

function performRequest(inputFunction, params = null) {
  // check if requests are allowed || allow x request to warm up the circuit breaker
  if (cbStatus === "closed" || requests.length < minRequests) {
    inputFunction(params)
      .then((data) => {
        response = data;
        consecutiveFailures = 0;
        requests.push(1);
        checkWindowLength();
      })
      .catch((error) => {
        consecutiveFailures++;
        requests.push(0);
        checkWindowLength();
        response = error;
      });
    // check if recovery requests are allowed
  } else if (cbStatus === "half-open") {
    // check if there are recovery requests left
    if (recoveryRequests < maxRecoveryRequests) {
      // try making a request to recover from half-open state
      inputFunction(params)
        .then((data) => {
          response = data;
          consecutiveFailures = 0;
          recoveryRequests = 0;
          requests.push(1);
          checkWindowLength();
        })
        .catch((error) => {
          consecutiveFailures++;
          recoveryRequests++;
          requests.push(0);
          checkWindowLength();
          response = error;
        });
    } else {
      cbStatus = "open";
    }
    // block every incoming request until timeout is over
  } else if (cbStatus === "open") {
    return;
  }

  // check if consecutiveFailureRate is too high
  if (
    consecutiveFailures >= maxConsecutiveFailures &&
    requests.length > minRequests
  )
    cbStatus = "open";

  // calculate failure rate and check if failureRate is too high
  failureRate =
    (requests.filter((item) => item === 0).length / requests.length) * 100;
  if (failureRate >= maxFailureRate && requests.length > minRequests)
    cbStatus = "open";

  // if circuit breaker status is open => start
  if (cbStatus === "open") startTimeout();

  return response;
}

function checkWindowLength() {
  if (requests.length === maxRequestWindow) requests.unshift();
}

async function startTimeout() {
  console.log("start timeout");
  setTimeout(endTimeout, recoveryTime);
}

function endTimeout() {
  consecutiveFailures = 0;
  recoveryRequests = 0;
  failureRate = 0;
  cbStatus = "half-open";
}

function logBreakerStats() {
  console.log(
    `requests: ${requests.length} | consecutive failures: ${consecutiveFailures} | failure rate: ${failureRate}% | recovery requests: ${recoveryRequests} | status: ${cbStatus}`,
  );
}

module.exports = { setParameters, performRequest, logBreakerStats };
