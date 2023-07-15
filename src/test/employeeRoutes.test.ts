
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import Employee from '../models/Employee';

jest.setTimeout(12000);
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Employee Routes', () => {
  let mongo: MongoMemoryReplSet;

  beforeAll(async () => {
    jest.clearAllMocks();
    mongo = await MongoMemoryReplSet.create({
      replSet: { count: 3, storageEngine: 'wiredTiger' },
    });
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
    await sleep(2000);
  });

  afterAll(async () => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    await mongo.stop();
    await mongo.cleanup();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Employee.deleteMany({});
  });

  it('should create a new employee', async () => {
    const response = await request(app)
      .post('/api/employee')
      .send({
        name: 'Amit Kumar Thakur',
        title: 'Software Engineer',
        department: 'Tech',
        annualSalary: 60000,
        password: 'password',
      });

      console.log(response.body,"response");
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('Amit Kumar Thakur');
  });

  it('should update an employee', async () => {
    const newEmployee = new Employee({
      name: 'Amit Kumar Thakur',
      title: 'Software Engineer',
      department: 'Tech',
      annualSalary: 600000,
      password: 'password',
    });
    const savedEmployee = await newEmployee.save();

    const response = await request(app)
      .put(`/api/employee/${savedEmployee._id}`)
      .send({
        department: 'HR',
        title: 'HR Manager',
        annualSalary: 700000,
      });

    expect(response.status).toBe(200);
    expect(response.body.department).toBe('HR');
    expect(response.body.title).toBe('HR Manager');
    expect(response.body.annualSalary).toBe(700000);
  });

  it('should delete an employee', async () => {
    const newEmployee = new Employee({
      name: 'Amit Kumar Thakur',
      title: 'Software Engineer',
      department: 'Tech',
      annualSalary: 600000,
      password: 'password',
    });
    const savedEmployee = await newEmployee.save();

    const response = await request(app).delete(`/api/employee/${savedEmployee._id}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(String(savedEmployee._id));

    const deletedEmployee = await Employee.findById(savedEmployee._id);
    expect(deletedEmployee).toBeNull();
  });
});
