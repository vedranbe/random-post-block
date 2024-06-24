import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelRow, PanelBody, SelectControl, RangeControl, ToggleControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';

/**
 * Fetches a random post and renders its content.
 *
 * @param {object} attributes - The attributes of the component.
 * @param {function} setAttributes - Function to set the attributes of the component.
 * @return {JSX.Element} The rendered content of the random post.
 */
const Edit = ({ attributes, setAttributes }) => {
	const [randomPostData, setRandomPostData] = useState(null);
	const [isRandomPostLoading, setIsRandomPostLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showImage, setShowImage] = useState(true);
	const [showExcerpt, setShowExcerpt] = useState(true);

	const handleShowImageChange = (newShowImageValue) => {
		setShowImage(newShowImageValue);
		setAttributes({ showImage: newShowImageValue });
		console.log(showImage);
	};

	const handleShowExcerptChange = (newShowExcerptValue) => {
		setShowExcerpt(newShowExcerptValue);
		setAttributes({ showExcerpt: newShowExcerptValue });
	};

	const handleMediaSizeChange = (newSize) => {
		setAttributes({ mediaSize: newSize });
	};

	const handleAspectRatioChange = (newRatio) => {
		setAttributes({ aspectRatio: newRatio });
	};

	const handleScaleChange = (newScaleValue) => {
		setAttributes({ scale: newScaleValue });
	};

	const handlePositionChange = (newPostionValue) => {
		setAttributes({ position: newPostionValue });
	};

	const handleExcerptLengthChange = (newLength) => {
		setAttributes({ excerptLength: newLength });
	};

	useEffect(() => {
		/**
		 * Fetches a random post from the API and sets the random post data in the component state.
		 *
		 * @param {void} 
		 * @return {Promise<void>} 
		 */
		const fetchRandomPost = async () => {
			setIsRandomPostLoading(true);
			setError(null);

			try {
				// Fetch random post
				const posts = await apiFetch({ path: '/wp/v2/posts', method: 'GET' });

				if (posts.length > 0) {
					const randomPost = posts[0];
					const postTitle = randomPost.title.rendered;
					const postExcerpt = randomPost.excerpt.rendered;
					const postLink = randomPost.link;

					// Check if the featured image is available
					if (randomPost.featured_media) {
						const mediaId = randomPost.featured_media;

						// Use the selected media size attribute here
						const mediaSize = attributes.mediaSize || 'full';
						const media = await apiFetch({ path: `/wp/v2/media/${mediaId}`, method: 'GET' });

						const excerptLength = attributes.excerptLength || 100;
						const cleanExcerpt = postExcerpt.replace(/<\/?[^>]+(>|$)/g, "").substring(0, excerptLength).concat('...');

						if (media && media.media_details && media.media_details.sizes && media.media_details.sizes[mediaSize]) {
							const postImage = media.media_details.sizes[mediaSize].source_url;

							setRandomPostData({
								title: postTitle,
								excerpt: cleanExcerpt,
								link: postLink,
								image: postImage,
							});
						}
					} else {
						setError(__('No featured media found for the post.', 'andiro'));
					}
				} else {
					setError(__('No published posts found.', 'andiro'));
				}
			} catch (error) {
				console.error('Error fetching random post:', error);
				setError(__('An error occurred while fetching the random post.', 'andiro'));
			} finally {
				setIsRandomPostLoading(false);
			}
		};

		fetchRandomPost();
	}, [attributes]);


	/**
	 * Function to render the content of a post.
	 *
	 * @return {JSX.Element} The rendered post content
	 */
	const renderPostContent = () => {
		if (isRandomPostLoading) {
			return (
				<>

					<a href="#" rel="noopener noreferrer"></a >
					<figure class="wp-block-image loading">Loading...</figure>
					<h3>Title</h3 >
					<p>Excerpt</p>
				</>
			);
		}
		if (error) {
			return <p>{error}</p>;
		}

		if (!randomPostData) {
			return null;
		}

		const { title, excerpt, link, image } = randomPostData;
		return (
			<>

				<a href={link} rel="noopener noreferrer"></a >
				{attributes.showImage && image && <figure class="wp-block-image"><img src={image} style={{ aspectRatio: attributes.aspectRatio, objectFit: attributes.scale }} alt={title} /></figure >}
				< h3 > {title}</h3 >
				{attributes.showExcerpt && <p>{excerpt}</p>}
			</>
		);
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Settings', 'andiro')}>
					<PanelRow>
						<ToggleControl
							labelPosition="left"
							checked={attributes.showImage}
							label="Show Image"
							onChange={handleShowImageChange}
						/>
					</PanelRow>
					{showImage && attributes.showImage && (
						<SelectControl
							label={__('Media Size', 'andiro')}
							value={attributes.mediaSize || 'full'}
							options={[
								{ label: __('Full', 'andiro'), value: 'full' },
								{ label: __('Large', 'andiro'), value: 'large' },
								{ label: __('Medium', 'andiro'), value: 'medium' },
								{ label: __('Thumbnail', 'andiro'), value: 'thumbnail' },
							]}
							onChange={handleMediaSizeChange}
						/>
					)}
					{showImage && attributes.showImage && (
						<SelectControl
							label={__('Aspect Ratio', 'andiro')}
							value={attributes.aspectRatio}
							options={[
								{ label: __('Original', 'andiro'), value: '' },
								{ label: __('Square - 1:1', 'andiro'), value: '1' },
								{ label: __('Standard - 4:3', 'andiro'), value: '4/3' },
								{ label: __('Portrait - 3:4', 'andiro'), value: '3/4' },
								{ label: __('Classic - 3:2', 'andiro'), value: '3/2' },
								{ label: __('Wide - 16:9', 'andiro'), value: '16/9' },
								{ label: __('Tall - 9:16', 'andiro'), value: '9/16' },
							]}
							onChange={handleAspectRatioChange}
						/>
					)}
					{showImage && attributes.showImage && (
						<SelectControl
							width={'100%'}
							label={__('Scale', 'andiro')}
							value={attributes.scale}
							options={[
								{ label: __('Cover', 'andiro'), value: 'cover' },
								{ label: __('Contain', 'andiro'), value: 'contain' },
							]}
							onChange={handleScaleChange}
						/>
					)}
					{showImage && attributes.showImage && (
						<SelectControl
							width={'100%'}
							label={__('Image Position', 'andiro')}
							value={attributes.position}
							options={[
								{ label: __('Center', 'andiro'), value: 'center' },
								{ label: __('Top', 'andiro'), value: 'top' },
								{ label: __('Bottom', 'andiro'), value: 'bottom' },
								{ label: __('Left', 'andiro'), value: 'left' },
								{ label: __('Right', 'andiro'), value: 'right' },
							]}
							onChange={handlePositionChange}
						/>
					)}
					<PanelRow>
						<ToggleControl
							labelPosition="left"
							checked={attributes.showExcerpt}
							label="Show Excerpt"
							onChange={handleShowExcerptChange}
						/>
					</PanelRow>
					{showExcerpt && attributes.showExcerpt && (
						<RangeControl
							help="Number of characters in the excerpt."
							initialPosition={150}
							value={attributes.excerptLength || '150'}
							label="Excerpt Length"
							max={250}
							min={50}
							onChange={handleExcerptLengthChange}
						/>
					)}

				</PanelBody>
			</InspectorControls>
			{renderPostContent()}
		</div>
	);
};

export default Edit;
