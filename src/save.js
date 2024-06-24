import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Renders the saved content of the block in the editor.
 *
 * @param {object} attributes - The block attributes.
 * @return {JSX.Element} The rendered content.
 */
const Save = ({ attributes }) => {
    const { showImage, showExcerpt, aspectRatio, scale, excerptLength } = attributes;

    const { title, excerpt, link, image } = attributes.postContent || {}; // Assuming attributes.postContent holds fetched post data

    if (!title) {
        return <p>{__('No data available.', 'andiro')}</p>;
    }

    const formattedExcerpt = excerptLength
        ? excerpt.slice(0, excerptLength).concat('...')
        : excerpt; // Handle excerpt truncation

    return (
        <div {...useBlockProps()}>
            {showImage && image && (
                <figure class="wp-block-image">
                    <img src={image} style={{ aspectRatio, objectFit: scale }} alt={title} />
                </figure>
            )}
            <h3>{title}</h3>
            {showExcerpt && <p>{formattedExcerpt}</p>}
        </div>
    );
};

export default Save;
