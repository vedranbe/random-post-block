import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Save from './save';
import Edit from './edit';
import metadata from './block.json';

registerBlockType(metadata.name, {
	save: Save,
	edit: Edit,
});
