import express from 'express';
import { configure } from './config';
import appRouters from './approuters';

let app;
export default app = express();

configure(app);

app.use('/', appRouters);

app.listen(app.get('port'), function () {
    console.log('verbose', 'Express server listening on port ' + app.get('port'));
});
