function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
  const date = dateTime.split(" ");

  employee.newEvent = {
    type: "TimeIn",
    hour: date[1],
    date: date[0],
  };
  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  const date = dateTime.split(" ");
  employee.newEvent = {
    type: "TimeOut",
    hour: date[1],
    date: date[0],
  };
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employee.timeOutEvents.find(
    (event) => event.date === date
  );
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const wagesEarned = hoursWorked * employee.payPerHour;
  return wagesEarned;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce(
    (total, date) => total + wagesEarnedOnDate(employee, date),
    0
  );
  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employees) {
  const totalPayroll = employees.reduce(
    (total, employee) => total + allWagesFor(employee),
    0
  );
  return totalPayroll;
}
