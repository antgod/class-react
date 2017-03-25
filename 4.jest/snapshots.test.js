import renderer from 'react-test-renderer';
import React from 'react'

const Table = list => <table>
  {list.map((row,index)=>{
    return <tr key={index}>
      {row.map((column,i)=>{
        return <td key={i}>{column}</td>
      })}
    </tr>
  })}
</table>

it('renders correctly', () => {
  const tree = renderer.create(Table([
    [1,2,3,4],
    [1,2,3,4],
  ])).toJSON();
//  console.log(tree)
  expect(tree).toMatchSnapshot()
});