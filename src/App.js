import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Graph } from 'react-d3-graph';

function App() {
	const [data, setData] = useState({
		nodes: [
			{ id: 'Harry', x: 500, y: 10 },
			{ id: 'Sally', x: 450, y: 60 },
			{ id: 'Alice', x: 550, y: 60 }
		],
		links: [
			{ source: 'Harry', target: 'Sally' },
			{ source: 'Harry', target: 'Alice' }
		],
		focusedNodeId: 'Harry'
	});

	const [myConfig, setMyConfig] = useState({
		nodeHighlightBehavior: true,
		directed: true,
		staticGraphWithDragAndDrop: true,
		automaticRearrangeAfterDropNode: true,
		staticGraph: true,
		minZoom: 1,
		maxZoom: 5,
		height: 400,
		width: 1000,
		node: {
			color: 'lightgreen',
			size: 120,
			highlightStrokeColor: 'blue'
		},
		link: {
			highlightColor: 'lightblue'
		}
	});

	const addNode = (nodeId, x, y) => {
		const newNode = 'Morta' + Math.random(10);
		data.nodes.push({
			id: newNode,
			x: x + 50,
			y: y + 50,
			symbolType: 'square'
		});
		data.links.push({ source: nodeId, target: newNode });
		setData({ ...data, focusedNodeId: newNode });
	};

	const handleNodeClick = nodeId => {
		const { x, y } = getNode(nodeId);
		addNode(nodeId, x, y);
	};

	const getNode = nodeId => {
		return data.nodes.filter(item => item.id === nodeId)[0];
	};

	return (
		<Page>
			<Wrapper>
				<div className='content'>
					<Graph
						id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
						data={data}
						config={myConfig}
						onClickNode={handleNodeClick}
					/>
				</div>
			</Wrapper>
			<GlobalStyle />
		</Page>
	);
}

const Wrapper = styled.div`
	display: flex;
	border: 1px dashed black;
	.sidebar {
		width: 300px;
		background-color: #cab086;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;

		div {
			margin-right: 15px;
			line-height: 50px;
			border: 1px solid black;
			width: 50px;
			height: 50px;
		}
	}
`;

const Page = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	max-width: 100vw;
	max-height: 100vh;
`;
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  *, :after, :before {
    box-sizing: inherit;
  }
`;
export default App;
