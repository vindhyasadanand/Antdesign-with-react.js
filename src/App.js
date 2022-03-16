import logo from './logo.svg';
import './App.css';
import {Button, Table,Modal,Input} from "antd";
import {useState} from 'react';
import 'antd/dist/antd.css';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
function App() {
  const[isEditing,setIsEditing] = useState(false)
  const[editingStudent,setEditingStudent] = useState(null)
  const[dataSource,setDataSource] = useState([
    {
      id:1,
      name:"John",
      email:"john@gmail.com",
      address:"America"
    },
    {
      id:2,
      name:"Vindhya",
      email:"vindhya@gmail.com",
      address:"Newyork"
    },
    {
      id:3,
      name:"Sandhya",
      email:"sandhya@gmail.com",
      address:"Germany"
    },
    {
      id:4,
      name:"Supreeth",
      email:"supreeth@gmail.com",
      address:"Germany"
    }
  ])
  const columns = [
    {
      key:'1',
      title:'ID',
      dataIndex:'id'
    },
    {
      key:'2',
      title:'Name',
      dataIndex:'name'
    },
    {
      key:'3',
      title:'Email',
      dataIndex:'email'
    },
    {
      key:'4',
      title:'Address',
      dataIndex:'address'
    },
    {
      key:"5",
      title:'Actions',
      render:(record)=>{
        return<>
        <EditOutlined  onClick={()=>{
          onEditStudent(record);
        }}/>
        <DeleteOutlined style={{color:"red",marginLeft:12}} onClick={()=>{
            onDeleteStudent(record)
        }}
          />
        </>
      }
    }
  ];
  const onAddStudent=()=>{
    const randomNumber = parseInt(Math.random()*1000)
    const newStudent = {
      
      id:randomNumber,
      name:"Name"+randomNumber,
      email:randomNumber+"@gmail.com",
      address:"Address"+randomNumber

    }
    setDataSource(pre=>{
      return [...pre,newStudent]
    })
  }
 
  const onDeleteStudent=(record)=>{
    Modal.confirm({
      title:"Are you sure you want to delete this record?",
      okText:"Yes",
      okType:'danger',
       onOk:()=>{
        setDataSource(pre=>{
          return pre.filter(student=>student.id!=record.id)
        })
       }
    })
    
  }
  const onEditStudent=(record)=>{
    setIsEditing(true)
    setEditingStudent({...record})
    
  }
  const resetEditing=()=>{
    setIsEditing(false)
    setEditingStudent(null)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}>Add a new Student</Button>
        <Table columns={columns} dataSource={dataSource}>
          
        </Table>
        <Modal title="Edit Student" visible={isEditing} okText="Save"
   onCancel={()=>{
   resetEditing()
 }}
 onOk={
   ()=>{
    setDataSource(pre=>{
      return pre.map(student=>{
        if(student.id==editingStudent.id)
        {
          return editingStudent
        }else{
          return student
        }
      })
    })
    resetEditing()
   }
 }>
   <Input value={editingStudent?.name} onChange={(e)=>{
     setEditingStudent(pre=>{
       return {...pre,name:e.target.value}
     })
   }}/>
   <Input value={editingStudent?.email}  onChange={(e)=>{
     setEditingStudent(pre=>{
       return {...pre,email:e.target.value}
     })
   }}/>
   <Input value={editingStudent?.address}  onChange={(e)=>{
     setEditingStudent(pre=>{
       return {...pre,address:e.target.value}
     })
   }}/>
        </Modal>
      </header>
    </div>
  );
}

export default App;
