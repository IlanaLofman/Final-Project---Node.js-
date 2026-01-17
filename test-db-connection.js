#!/usr/bin/env node

require('dotenv').config();

const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log('Testing MongoDB connection...');
        console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'NOT SET');
        
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            minPoolSize: 2,
        });
        
        console.log('✓ Connected to MongoDB');

        // Try a simple query
        const Cost = require('./models/cost');
        const User = require('./models/user');
        
        console.log('\nTesting queries...');
        
        // Test 1: Find a user
        const user = await User.findOne({ id: 123123 });
        console.log('✓ User query succeeded:', user ? 'Found user' : 'No user');
        
        // Test 2: Find costs
        const costs = await Cost.find({ userid: 123123 });
        console.log('✓ Costs query succeeded, found', costs.length, 'costs');
        
        console.log('\n✓ All tests passed!');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('✗ Error:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}

testConnection();
