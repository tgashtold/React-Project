import React from 'react';

interface ITagsInputProps {
	tags: Array<string>;
	sendTags: Function;
	inputClass: string;
}

interface ITagsInputState {
	tags: Array<string>;
}

class TagsInput extends React.Component<ITagsInputProps, ITagsInputState> {
	tagsMaxLength: number = 25;

	constructor(props: any) {
		super(props);
		this.state = {
			tags: this.props.tags
		};
	}

	removeTags = (indexToRemove: any) => {
		const newTagsArr = [ ...this.state.tags.filter((_, index) => index !== indexToRemove) ];

		this.setState({ tags: newTagsArr });
		this.props.sendTags(newTagsArr);
	};

	addTags = (event: any) => {
		if (event.target.value !== '') {
			const newTagsArr = [ ...this.state.tags, event.target.value ];

			this.props.sendTags(newTagsArr);

			this.setState({ tags: newTagsArr });

			event.target.value = '';
		}
	};

	render() {
		return (
			<div className={`tags-input input ${this.props.inputClass} `}>
				<ul className="tags-wrapper">
					{this.state.tags.map((tag, index) => (
						<li key={index} className="tag">
							<span className="tag-title">{tag}</span>
							<span className="tag-close-icon" onClick={() => this.removeTags(index)}>
								x
							</span>
						</li>
					))}
				</ul>
				<input
					type="text"
					onKeyUp={(event) => (event.key === 'Enter' ? this.addTags(event) : null)}
					placeholder="Press enter to add tags"
					className="tag-input"
					maxLength={this.tagsMaxLength}
				/>
			</div>
		);
	}
}

export default TagsInput;
