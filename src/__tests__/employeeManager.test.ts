import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });
  it("Can add new employee", async () =>{
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name:"Justin Nguyen",
      phone: "8012345678",
      title: "QA Engineer",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Teresa Osborne");
    await em.selectEmployeeByName("Justin Nguyen");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id:11,
      name:"Justin Nguyen",
      phone: "8012345678",
      title: "QA Engineer",
    });
  });
  it("Cancelling an edit of an employee", async ()=>{
    await em.selectEmployeeByName("Ruby Estrada");
    await em.editEmployee({
      name: "David Beckham",
      title: "QA Engineer",
    }); 
    await em.cancelChanges();
    await em.selectEmployeeByName("Ruby Estrada");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id:7,
      name:"Ruby Estrada",
      phone: "5740923478",
      title: "Back-End Developer",
    });
  });
  it("When editing and then navigating away without saving does not save changes", async ()=>{
    await em.selectEmployeeByName("Lou White");
    await em.editEmployee({
      name: "Justin Nguyen",
      phone: "1234567891",
      title: "QA Engineer",
    });
    await em.navigate();
    await em.selectEmployeeByName("Lou White");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id:8,
      name:"Lou White",
      phone: "8727813498",
      title: "Full-Stack Developer",
    })
  })


});
