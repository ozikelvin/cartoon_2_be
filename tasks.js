// Import packages
const  Listr = require( 'listr');
const  connectDB = require( './utils/connect_db.js');
const { startApp, setUpRoutes } = require( "./start.js")


module.exports =  async function runApp() {

    // Set Tasks
    const tasks = new Listr(
        [
            {
                title: 'Running start setup ...',
                task: () => {
                    return true;
                },
            },
            {
                title: 'Connecting To Database...',
                task: () => connectDB(),
            },
            {
                title: 'Setting up routes...',
                task: () => setUpRoutes(),
            },
            {
                title: 'Starting Application...',
                task: () => startApp(),
            },
        ]
    );

    await tasks.run();

    return true;
}