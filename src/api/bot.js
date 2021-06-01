const https = require ( 'https' )
class Bot
{
    constructor ( token )
    {
        this.token = token;
    }
    get token ()
    {
        return this.token;
    }
    req ( meth, params )
    {
        const options = {
            host: 'api.telegram.org',
            path: `/bot${this.token}/${meth}`,
            method: 'POST',
            headers: { accept: "application/json" }
        };
        const req = https.request ( options, ( res ) => {

        } );
    }
}

export default Bot;