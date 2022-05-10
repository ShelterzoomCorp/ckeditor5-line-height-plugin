import { Plugin } from 'ckeditor5/src/core';
import { isSupported, buildDefinition } from './utils';
import LineHeightCommand from './lineheightcommand';

export default class LineHightEditing extends Plugin {
	constructor( editor ) {
		super( editor );

		editor.config.define( 'lineHeight', {
			options: [ 0, 0.5, 1, 1.5, 2 ]
		} );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		// Filter out unsupported options.
		const enabledOptions = editor.config.get( 'lineHeight.options' ).map( option => String( option ) ).filter( isSupported ); // filter

		// Allow alignment attribute on all blocks.
		schema.extend( '$block', { allowAttributes: 'lineHeight' } );
		editor.model.schema.setAttributeProperties( 'lineHeight', { isFormatting: true } );

		const definition = buildDefinition( enabledOptions/* .filter( option => !isDefault( option ) ) */ );

		editor.conversion.attributeToAttribute( definition );

		editor.commands.add( 'LineHeight', new LineHeightCommand( editor ) );
	}
}
