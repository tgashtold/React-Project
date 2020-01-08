import React from 'react';

interface ITagsFieldProps {
    tags: string[];
    activeTag: string;
    onTagClick: (tagName: string) => void;
}

interface ITagsFieldState {
    activeTag: string;
}

export class TagsField extends React.Component<ITagsFieldProps, ITagsFieldState | any> {
    constructor(props: ITagsFieldProps) {
        super(props);
        this.state = {
            activeTag: this.props.activeTag
        }
    }

    handleTagClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.textContent) {
            const searchedTag: string = event.currentTarget.textContent.slice(1);

            this.setState({activeTag: searchedTag});

            this.props.onTagClick(searchedTag);
        }
    };


    render() {
        return (
            <section className="tags">
                {this.props.tags.map((tag: string) =>
                    <button key={tag} onClick={(e) => this.handleTagClick(e)} className={`tags__item ${
                        tag === this.props.activeTag
                            ? 'tag-active'
                            : ''
                        }`}>#{tag}</button>
                )
                }
                {this.props.children}
            </section>
        );
    }
}
