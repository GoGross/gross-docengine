"use strict";

const request = require ( 'request' );

/**
 * @class DocEngine
 * @hideconstructor
 * @classdesc Get ip info for a specified IP address or requesting server IP address
 * @fileOverview This is base file for credit card management
 * @version 1.0.0
 * @module exactIP
 * @param {string} DOCENGINE_KEY - environment key
 * @returns {Promise} DocEngine Object
 *
 */

module.exports = class DocEngine {
	
	/**
	 * @constructor
	 * @hideconstructor
	 * @param {string} DOCENGINE_KEY - environment key
	 * @param {object} OPTIONS - options object for printing document
	 */
	constructor ( OPTIONS, DOCENGINE_KEY ) {
		
		this.OPTIONS       = OPTIONS;
		this.DOCENGINE_KEY = DOCENGINE_KEY || process.env.DOCENGINE_KEY;
		this.baseURL       = "https://api.gogross.com/docengine/";
		
	}
	
	/**
	 * Get IP info
	 * @example <caption>Example usage on invocation.</caption>
	 * let card = new Document ( {
	*	    objectId: "guFmMzEn4q"
	* } );
	 * return await card.get (); // don't capture promises in cloud
	 *
	 *
	 * @requires {DOCENGINE_KEY}  process.env.DOCENGINE_KEY for
	 * @returns {Object} `{
	 * "ip": "105.4.7.150",
	 * "location": {
	 *  "city": "Johannesburg",
	 *  "region": "Gauteng",
	 *  "country": "ZA"
     *   "lon": -26.2309,
     *   "lat": 28.0583,
     *   "postal": "2001"
     *   }
     *       . . .
	 * }`
	 *
	 */
	async info () {
		
		return new Promise ( async ( resolve, reject ) => {
			
			if ( !this.DOCENGINE_KEY ) {
				
				reject ( "Error, missing API KEY environment variable" )
				
			} else {
				
				let url = this.baseURL + '?key=' + this.DOCENGINE_KEY;  // signup for free at docengine.gogross.com
				
				return request ( { url : url }, function ( error, response, body ) {
					
					if ( error ) {
						
						reject ( error )
						
					} else {
						
						try{
							
							body = JSON.parse ( body );
							
							if ( body.hasOwnProperty ( "error" ) ) {
								
								reject ( body )
								
							}
							
						}catch ( e ) {
							
							resolve ( body )
							
						}
						
					}
					
				} );
				
			}
			
		} )
		
	}
	
};
