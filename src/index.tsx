
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { TextControl, Button, TextareaControl, PanelHeader, PanelBody } from '@wordpress/components';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { BlockEditProps, BlockSaveProps } from '@wordpress/blocks';
import './style.scss';

import './editor.scss';


import metadata from './block.json';


interface AjaxConfig {
    url: string;
    method: 'GET' | 'POST';
    action: string;
    params: string; // Record<string, any>;
}


export interface Attributes {
    id: string;
    lookup: "ajax" | "list" | "function";
    ajax: AjaxConfig;
    selector: string;
    options: Partial<JQueryAutocompleteOptions>;
};



registerBlockType(metadata as any, {
    edit: Edit,
    // save: Save,
});

function Edit({ attributes, setAttributes, context }: BlockEditProps<Attributes>) {
    let ajax = attributes.ajax ?? {};

    return (
        <div {...useBlockProps({})}>
            <InspectorControls key="setting">
                <PanelBody>
                    <fieldset>
                        <legend>Selector</legend>
                        <TextControl value={attributes.selector}
                            onChange={(selector) => setAttributes({ selector })}></TextControl>
                    </fieldset>
                    <small> </small>
                    <fieldset>
                        <legend>ID</legend>
                        <TextControl value={attributes.id}
                            onChange={(id) => setAttributes({ id })}></TextControl>
                    </fieldset>
                </PanelBody>
                <PanelBody title='Ajax'>
                    <fieldset>
                        <legend>Ajax URL</legend>
                        <TextControl value={ajax.url}
                            onChange={(url) => setAttributes({ ajax: { ...ajax, url } })}></TextControl>
                    </fieldset>
                    <small> </small>
                    <fieldset>
                        <legend>Ajax Action</legend>
                        <TextControl value={ajax.action}
                            onChange={(action) => setAttributes({ ajax: { ...ajax, action } })}></TextControl>
                    </fieldset>
                    <small> </small>
                    <fieldset>
                        <legend>Ajax Parameters</legend>
                        <TextControl value={ajax.params}
                            onChange={(params) => setAttributes({ ajax: { ...ajax, params } })}></TextControl>
                    </fieldset>
                </PanelBody>
            </InspectorControls>
            <code>AUTOCOMPLETE</code>
        </div>
    );
}

function Save({ attributes }: BlockSaveProps<Attributes>) {
    // return (
    //     <div {...useBlockProps.save()}></div>
    // );
}

