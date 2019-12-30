import React from 'react';
import {IChangedEventArgs} from "../../..";

interface ITagsInputProps {
	tags: Array<string>;
	onChanged: (input: IChangedEventArgs) => void;
	name: string;
}

interface ITagsInputState {
	tags: Array<string>;
}

export class InputTags extends React.Component<ITagsInputProps, ITagsInputState> {
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

			this.props.onChanged({
				name: this.props.name,
				value: newTagsArr,
				isValid: newTagsArr.length>0,
			});


	};

	addTags = (event: any) => {
		if (event.target.value !== '') {
			const newTagsArr = [ ...this.state.tags, event.target.value ];

			this.props.onChanged({
				name: this.props.name,
				value: newTagsArr,
				isValid: newTagsArr.length>0,
			});

			this.setState({ tags: newTagsArr });

			event.target.value = '';
		}
	};

	render() {
		return (
				<div className="tags-input input">
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
					name={this.props.name}
					type="text"
					onKeyUp={(event) => (event.key === 'Enter'
						? this.addTags(event)
						: null)}
					placeholder="Press enter to add tags"
					className="tag-input"
					maxLength={this.tagsMaxLength}
				/>
			</div>
		);
	}
}
