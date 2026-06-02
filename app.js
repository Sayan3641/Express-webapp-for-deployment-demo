import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Lambda');
});

// // Local testing only
// if (process.env.NODE_ENV !== 'production') {
//     app.listen(3000, () => {
//         console.log('Server running on port 3000');
//     });
// }

export default app;