const DocEngine     = require ( './index' );
const DOCENGINE_KEY   = process.env.DOCENGINE_KEY;  // API Key

const DOC = {
	HTML: "<div>body</div>",
	pdfName : "try",
	options: {
		headerHTML : "<div>header</div>",
		footerHTML : "<div>footer</div>",
		pageSize : "A4",
		pageOrientation : "portrait",
		marginWidthTop : "10mm",
		marginWidthLeft : "10mm",
		marginWidthRight : "10mm",
		marginWidthBottom : "10mm",
		headerHeight : "10mm",
		footerHeight : "10mm"
	}
};

const docEngine     = new DocEngine ( DOC, DOCENGINE_KEY  );
docEngine.print ( )
	.then ( ( documentUrl ) => {
		
		console.log ( documentUrl );
		
	} )
	.catch ( ( error ) => {
		
		console.trace ( error );
		
	} );
