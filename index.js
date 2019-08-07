"use strict";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
	 * @param {object} CONFIG - options object for printing document
	 */
	constructor ( CONFIG, DOCENGINE_KEY ) {
		
		this.OPTIONS       = CONFIG.options;
		this.HTML          = CONFIG.HTML;
		this.pdfName       = CONFIG.pdfName;
		this.DOCENGINE_KEY = DOCENGINE_KEY || process.env.DOCENGINE_KEY;
		this.baseURL       = (process.env.ENV = "development") ? "https://localhost:8080/docengine/" : "https://api.gogross.com/docengine/";
		
	}
	
	async print () {
		
		return new Promise ( async ( resolve, reject ) => {
			
			if ( !this.DOCENGINE_KEY ) {
				
				reject ( "Error, missing API KEY environment variable" )
				
			} else {
				
				let url = this.baseURL + '?key=' + this.DOCENGINE_KEY;  // signup for free at docengine.gogross.com
				
				return request ( {
					url : url,
					method : 'get',
					headers : {},
					body : {
						html : this.HTML,
						pdfSettings : JSON.stringify ( this.OPTIONS ),
						pdfName : this.pdfName
					},
					json : true
				}, async function ( error, response, body ) {
					
					if ( error ) {
						
						reject ( error )
						
					} else {
						
						try {
							
							body = JSON.parse ( body );
							
							if ( body.hasOwnProperty ( "error" ) ) {
								
								reject ( body )
								
							} else {
								
								resolve ( body )
								
							}
							
						} catch ( e ) {
							
							resolve ( body )
							
						}
						
					}
					
				} );
				
			}
			
		} )
		
	}
	
};
