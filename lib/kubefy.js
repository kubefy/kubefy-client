const chalk       = require('chalk');
const inquirer    = require('./inquirer');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const axios       = require('axios');
const Configstore = require('configstore');
const pkg         = require('../package.json');

const conf = new Configstore(pkg.name);

module.exports = {

    createUser: async () => {
        const answers = await inquirer.askKubefyCreateUser();
        const url = answers.url;
        if (url) {
            conf.set('kubefy.url', url);
        }
        if (answers.userName) {
            conf.set('kubefy.userName', answers.userName);
        }        
        if (answers.bucket) {
            conf.set('kubefy.bucket', answers.bucket);
        }
        if (answers.dockerId) {
            conf.set('kubefy.dockerId', answers.dockerId);
        }
        if (answers.dockerPassword) {
            conf.set('kubefy.dockerPassword', answers.dockerPassword);
        }
        if (answers.githubId) {
            conf.set('kubefy.githubId', answers.githubId);
        }
        if (answers.githubPassword) {
            conf.set('kubefy.githubPassword', answers.githubPassword);
        }
        const status = new Spinner('Calling Kubefy CreateUser ...');
        status.start();
        try {
            const response = await axios.post(url + '/users', {
                userName : answers.userName,
                bucket : answers.bucket,
                dockerId: answers.dockerId,
                dockerPassword: answers.dockerPassword,
                githubId: answers.githubId,
                githubPassword: answers.githubPassword
            })
            console.log(response.data);
            return response.data;
        } catch(err) {
            throw err;
        } finally {
            status.stop();
        }
    },

    createFunction: async () => {
        const kubefy = conf.get('kubefy')
        if (!kubefy) {
            console.log(chalk.red('Couldn\'t get kubefy config'));
            return;
        }
        const answers = await inquirer.askKubefyCreateFunction();
        const url = kubefy.url;
        const status = new Spinner('Calling Kubefy CreateFunction ...');
        status.start();
        try {
            const response = await axios.post(url + '/functions', {
                userName : kubefy.userName,
                functionName: answers.funcName,
                image: answers.image,
                repo: answers.gitRepo
            });
            console.log(response.data);
            
            return response.data;
        } catch(err) {
            throw err;
        } finally {
            status.stop();
        }
    },

    getFunction: async () => {
        const kubefy = conf.get('kubefy')
        if (!kubefy) {
            console.log(chalk.red('Couldn\'t get kubefy config'));
            return;
        }
        const answers = await inquirer.askKubefyGetFunction();
        const url = kubefy.url;
        const status = new Spinner('Calling Kubefy GetFunction ...');
        status.start();
        try {
            const response = await axios.get(url + '/functions',
                                             {
                                                 data: {
                                                     userName : kubefy.userName,
                                                     functionName: answers.funcName
                                                 }
                                             });
            
            if (response.data.endpoints) {
                console.log(JSON.stringify(response.data));
                return response.data;
            }
        } catch(err) {
            throw err;
        } finally {
            status.stop();
        }
    },
    
}
