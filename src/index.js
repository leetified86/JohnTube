import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyDLu3yGrm4JInaYSd5ddNz7Fj8VaY2j3qE';

// Create a new component. Should produce some HTML

class App extends Component{
	constructor(props) {
		super(props);

		this.state = { 
			videos: [], 
			selectedVideo: null
		};

		this.videoSearch('nba highlights');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, (videos) => {
			// this.setState({ videos: videos }); ES6 (Converts to)
			this.setState ({ 
				videos: videos, 
				selectedVideo: videos[0] 
			});
		});
	}


	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 400);

		return (
			<div>
				<SearchBar onSearchTermChange={term => this.videoSearch(term)} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos} />
			</div>
		);
	}
}

// Take this component's generated HTML and put it on the page (in the DOM)

ReactDOM.render(<App />, document.querySelector('.container'));