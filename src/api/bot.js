const https = require ( 'https' );
class Bot
{
    constructor ( token )
    {
        this.token = token;
    };
    get token ()
    {
        return this.token;
    };
    req ( meth, params )
    {
        const options = {
            host: 'api.telegram.org',
            path: `/bot${this.token}/${meth}`,
            method: 'POST',
            headers: { accept: 'application/json' }
        };
        const req = https.request ( options, ( res ) => {
            const jsonres = JSON.parse ( res );
            if ( !jsonres.ok ) console.log ( 'Telegram returned: ' + jsonres.error_code + '\n' + jsonres.description );
        } );
        req.on ( 'error', ( err ) => {
            console.log ( err ); //delete it later  
        } );
    };
}

export default Bot;