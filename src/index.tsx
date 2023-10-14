
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { TextControl, Button, TextareaControl, PanelRow, PanelBody } from '@wordpress/components';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { BlockEditProps, BlockSaveProps } from '@wordpress/blocks';
import './style.scss';

import './editor.scss';


import metadata from './block.json';



export interface Attributes {
    taxPlaceholder: string;
    placeholder: string;
    selector: string;
    options: Partial<JQueryAutocompleteOptions>;
};



registerBlockType(metadata as any, {
    edit: Edit,
    // save: Save,
});

function Edit({ attributes, setAttributes, context }: BlockEditProps<Attributes>) {
    let options = JSON.stringify({
        deferRequestBy: 500,
        ...(attributes.options ?? {})
    }, null, 2);
    let setOptions = (options: string) => setAttributes({ options: JSON.parse(options) });
    return (
        <div {...useBlockProps({})}>
            <InspectorControls key="setting">
                <PanelBody>
                    <fieldset>
                        <legend>Selector</legend>
                        <TextControl value={attributes.selector}
                            onChange={(selector) => setAttributes({ selector })}></TextControl>
                    </fieldset>
                    <fieldset>
                        <legend>Options</legend>
                        <TextareaControl value={options}
                            onChange={() => null}
                            onBlur={(e) => setOptions(e.target.value)}></TextareaControl>
                    </fieldset>
                </PanelBody>
            </InspectorControls>
            <code>AUTOCOMPLETE</code>
        </div>
    );
}

function Save({ attributes }: BlockSaveProps<Attributes>) {
    return (
        <div {...useBlockProps.save()}></div>
    );
}

