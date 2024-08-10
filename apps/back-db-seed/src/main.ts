import axios from 'axios';
import { faker } from '@faker-js/faker';

const API_BASE_URL = 'http://localhost:3000/api';

async function seedProjects() {
    for (let i = 0; i < 10; i++) {
        const project = {
            title: faker.company.name(),
            description: faker.lorem.sentence(),
            type: "INPROGRESS",
        };
        
        try {
            const response = await axios.post(`${API_BASE_URL}/project/create`, project);
            console.log(`Created project: ${response.data.name}`);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    }
}

async function seedTasks() {
    const projectIds = await getProjectIds();
    for (let i = 0; i < 50; i++) {
        const task = {
            title: faker.hacker.phrase(),
            description: faker.lorem.paragraph(),
            projectId: faker.helpers.arrayElement(projectIds),
            status: 'PENDING',
            dueDate: faker.date.future().toISOString(),
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/task/create`, task);
            console.log(`Created task: ${response.data.title}`);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    }
}

async function seedContributors() {
    const projectIds = await getProjectIds();
    for (let i = 0; i < 20; i++) {
        const contributor = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: faker.person.jobTitle(),
            projectId: faker.helpers.arrayElement(projectIds),
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/contributor/create`, contributor);
            console.log(`Created contributor: ${response.data.name}`);
        } catch (error) {
            console.error('Error creating contributor:', error);
        }
    }
}

async function seedStatuses() {
    const statuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

    for (const status of statuses) {
        try {
            const response = await axios.post(`${API_BASE_URL}/statuse/create`, { name: status });
            console.log(`Created status: ${response.data.name}`);
        } catch (error) {
            console.error('Error creating status:', error);
        }
    }
}

async function getProjectIds() {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        return response.data.map((project: any) => project.id);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

async function seedDatabase() {
    await seedProjects();
    await seedStatuses();
    await seedTasks();
    await seedContributors();
}

seedDatabase().then(() => {
    console.log('Database seeding completed.');
}).catch((error) => {
    console.error('Database seeding failed:', error);
});