// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Form, Input, Table, Spin, message, Modal, Grid } from "antd";
// import "antd/dist/reset.css";

// const { useBreakpoint } = Grid;

// const TeacherSubjectAllocation = () => {
//   const [allocations, setAllocations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const screens = useBreakpoint(); // For responsive layout

//   useEffect(() => {
//     fetchAllocations();
//   }, []);

//   const fetchAllocations = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation");
//       setAllocations(response.data);
//     } catch (error) {
//       console.error("Error fetching allocations", error);
//       message.error("Failed to fetch allocations.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const response = await axios.post("https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation", values, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 201) {
//         message.success("Allocation added successfully.");
//         fetchAllocations();
//         setShowForm(false);
//       }
//     } catch (error) {
//       console.error("Error adding allocation", error);
//       message.error("Failed to add allocation.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (teacher_id) => {
//     Modal.confirm({
//       title: "Are you sure you want to delete this allocation?",
//       onOk: async () => {
//         setLoading(true);
//         try {
//           await axios.delete(`https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation/${teacher_id}`);
//           message.success("Allocation deleted successfully.");
//           fetchAllocations();
//         } catch (error) {
//           console.error("Error deleting allocation", error);
//           message.error("Failed to delete allocation.");
//         } finally {
//           setLoading(false);
//         }
//       },
//     });
//   };

//   return (
//     <div style={{ background: "#EAF2F8", padding: "20px", borderRadius: "8px" }}>
//       <h2 style={{ color: "#2C3E50", textAlign: "center" }}>Teacher-Subject Scheduling</h2>

//       {/* Add Allocation Button */}
//       <Button
//         type="primary"
//         onClick={() => setShowForm(true)}
//         style={{ marginBottom: "20px", backgroundColor: '#2C3E50', width: screens.xs ? '100%' : 'auto' }} // Full-width on small screens
//       >
//         Add Allocation
//       </Button>

//       {/* Modal for Adding Allocation */}
//       <Modal
//         title="Add New Allocation"
//         visible={showForm}
//         onCancel={() => setShowForm(false)}
//         footer={null}
//         centered
//         width={screens.xs ? "90%" : 600} // 90% width on small screens
//       >
//         <Form layout="vertical" onFinish={handleSubmit}>
//           <Form.Item name="teacher_name" label="Teacher Name" rules={[{ required: true, message: "Teacher Name is required" }]}>
//             <Input placeholder="Enter Teacher Name" />
//           </Form.Item>
//           <Form.Item name="subject_code" label="Subject Code" rules={[{ required: true, message: "Subject Code is required" }]}>
//             <Input placeholder="Enter Subject Code" />
//           </Form.Item>
//           <Form.Item name="subject_name" label="Subject Name" rules={[{ required: true, message: "Subject Name is required" }]}>
//             <Input placeholder="Enter Subject Name" />
//           </Form.Item>
//           <Form.Item name="class" label="Class" rules={[{ required: true, message: "Class is required" }]}>
//             <Input placeholder="Enter Class" />
//           </Form.Item>
//           <Form.Item name="teacher_id" label="Teacher ID" rules={[{ required: true, message: "Teacher ID is required" }]}>
//             <Input placeholder="Enter Teacher ID" />
//           </Form.Item>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2C3E50', flex: 1 }}>
//               Add Allocation
//             </Button>
//             <Button type="default" danger onClick={() => setShowForm(false)} style={{ flex: 1 }}>
//               Cancel
//             </Button>
//           </div>
//         </Form>
//       </Modal>

//       {/* Allocation Table */}
//       <Spin spinning={loading} tip="Loading...">
//         <Table
//           dataSource={allocations}
//           bordered
//           rowKey="teacher_id"
//           style={{ marginTop: "20px" }}
//           scroll={{ x: screens.xs ? 600 : 'auto' }} // Scroll horizontally on smaller screens
//         >
//           <Table.Column title="Teacher Name" dataIndex="teacher_name" key="teacher_name" />
//           <Table.Column title="Subject Code" dataIndex="subject_code" key="subject_code" />
//           <Table.Column title="Subject Name" dataIndex="subject_name" key="subject_name" />
//           <Table.Column title="Class" dataIndex="class" key="class" />
//           <Table.Column title="Teacher ID" dataIndex="teacher_id" key="teacher_id" />
//           <Table.Column
//             title="Actions"
//             key="actions"
//             render={(_, record) => (
//               <Button type="default" danger onClick={() => handleDelete(record.teacher_id)}>
//                 Delete
//               </Button>
//             )}
//           />
//         </Table>
//       </Spin>
//     </div>
//   );
// };

// export default TeacherSubjectAllocation;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Form, Input, Table, Spin, message, Modal, Grid, Select } from "antd";
// import "antd/dist/reset.css";

// const { useBreakpoint } = Grid;
// const { Option } = Select;

// const TeacherSubjectAllocation = () => {
//   const [allocations, setAllocations] = useState([]);
//   const [teacherNames, setTeacherNames] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const screens = useBreakpoint(); // For responsive layout


//   useEffect(() => {
//     fetchAllocations();
//     fetchTeacherNames();
//   }, []);


//   const fetchTeacherNames = async () => {
//     try {
//       const response = await axios.get("https://studygrid-backendmongo.onrender.com/api/teachers");
//       setTeacherNames(response.data); // Assuming response.data is an array of teacher names
//     } catch (error) {
//       console.error("Error fetching teacher names", error);
//       message.error("Failed to fetch teacher names.");
//     }
//   };

//   const fetchAllocations = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation");
//       setAllocations(response.data);
//     } catch (error) {
//       console.error("Error fetching allocations", error);
//       message.error("Failed to fetch allocations.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const response = await axios.post("https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation", values, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 201) {
//         message.success("Allocation added successfully.");
//         fetchAllocations();
//         setShowForm(false);
//       }
//     } catch (error) {
//       console.error("Error adding allocation", error);
//       message.error("Failed to add allocation.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (teacher_id) => {
//     Modal.confirm({
//       title: "Are you sure you want to delete this allocation?",
//       onOk: async () => {
//         setLoading(true);
//         try {
//           await axios.delete(`https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation/${teacher_id}`);
//           message.success("Allocation deleted successfully.");
//           fetchAllocations();
//         } catch (error) {
//           console.error("Error deleting allocation", error);
//           message.error("Failed to delete allocation.");
//         } finally {
//           setLoading(false);
//         }
//       },
//     });
//   };
//   const filteredAllocations = allocations.filter((item) =>
//     Object.values(item).some(value =>
//       value.toString().toLowerCase().includes(searchText.toLowerCase())
//     )
//   );






//   return (
//     <div style={{ background: "#EAF2F8", padding: "20px", borderRadius: "8px" }}>
//       <h2 style={{ color: "#2C3E50" }}>Teacher-Subject Scheduling</h2>
//       <Input
//         placeholder="Search..."
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         style={{ marginBottom: "20px", width: screens.xs ? "100%" : "300px" }}
//       />

//       {/* Add Allocation Button */}
//       <Button
//         type="primary"
//         onClick={() => setShowForm(true)}
//         style={{ marginBottom: "20px", backgroundColor: '#2C3E50', width: screens.xs ? '100%' : 'auto' }} // Full-width on small screens
//       >
//         subject Allocation
//       </Button>

//       {/* Modal for Adding Allocation */}
//       <Modal
//         title="Add New Allocation"
//         visible={showForm}
//         onCancel={() => setShowForm(false)}
//         footer={null}
//         centered
//         width={screens.xs ? "90%" : 600} // 90% width on small screens
//       >
//         <Form layout="vertical" onFinish={handleSubmit}>
//           <Form.Item name="teacher_id" label="Teacher Name" rules={[{ required: true, message: "Teacher Name is required" }]}>
//             <Select placeholder="Select Teacher" onChange={(value, option) => form.setFieldsValue({ teacher_name: option.children })}>
//               {teacherNames.map((teacher) => (
//                 <Option key={teacher._id} value={teacher._id}>
//                   {teacher.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item name="teacher_name" hidden>
//             <Input />
//           </Form.Item>


//           <Form.Item name="subject_code" label="Subject Code" rules={[{ required: true, message: "Subject Code is required" }]}>
//             <Input placeholder="Enter Subject Code" />
//           </Form.Item>
//           <Form.Item
//             label="Subject Name"
//             name="subject_name"
//             rules={[{ required: true, message: 'Please select a subject!' }]}
//           >
//             <Select placeholder="Select Subject">
//               {[
//                 "English", "Environmental Studies", "Mathematics", "Mother Tongue", "Computer Basics", "Science", "Social Studies", "Computer Applications", "General Awareness", "Language Skills", "Mathematics Basics", "Numbers and Shapes", "Rhymes and Stories"
//               ].map((subject) => (
//                 <Option key={subject} value={subject}>
//                   {subject}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item name="class" label="Class" rules={[{ required: true, message: "Please select a class!" }]}>
//             <Select placeholder="Select Class">
//               {["1st", "2nd", "3rd", "4th", "5th", "UKG", "LKG"].map((grade) => (
//                 <Option key={grade} value={grade}>
//                   {grade}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <div style={{ display: "flex", gap: "10px" }}>
//             <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2C3E50', flex: 1 }}>
//               Add Allocation
//             </Button>
//             <Button type="default" danger onClick={() => setShowForm(false)} style={{ flex: 1 }}>
//               Cancel
//             </Button>
//           </div>
//         </Form>
//       </Modal>

//       {/* Allocation Table */}
//       <Spin spinning={loading} tip="Loading...">
//         <Table
//           dataSource={filteredAllocations}
//           bordered
//           rowKey="teacher_id"
//           style={{ marginTop: "20px" }}
//           scroll={{ x: screens.xs ? 600 : 'auto' }} // Scroll horizontally on smaller screens
//         >
//           <Table.Column
//             title="Teacher Name"
//             dataIndex="teacher_name"
//             key="teacher_name"
//             onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
//           />
//           <Table.Column
//             title="Subject Code"
//             dataIndex="subject_code"
//             key="subject_code"
//             onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
//           />
//           <Table.Column
//             title="Subject Name"
//             dataIndex="subject_name"
//             key="subject_name"
//             onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
//           />
//           <Table.Column
//             title="Class"
//             dataIndex="class"
//             key="class"
//             onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
//           />
//           <Table.Column
//             title="Teacher ID"
//             dataIndex="teacher_id"
//             key="teacher_id"
//             onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
//           />
//           <Table.Column
//             title="Actions"
//             key="actions"
//             onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
//             render={(_, record) => (
//               <Button type="default" danger onClick={() => handleDelete(record.teacher_id)}>
//                 Delete
//               </Button>
//             )}
//           />
//         </Table>
//       </Spin>
//     </div>
//   );
// };

// export default TeacherSubjectAllocation;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Table, Spin, message, Modal, Grid, Select } from "antd";
import "antd/dist/reset.css";

const { useBreakpoint } = Grid;
const { Option } = Select;

const TeacherSubjectAllocation = () => {
  const [allocations, setAllocations] = useState([]);
  const [teacherNames, setTeacherNames] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();
  const [form] = Form.useForm(); // Create form instance

  useEffect(() => {
    fetchAllocations();
    fetchTeacherNames();
  }, []);

  const fetchTeacherNames = async () => {
    try {
      const response = await axios.get("https://studygrid-backendmongo.onrender.com/api/teachers");
      setTeacherNames(response.data);
    } catch (error) {
      console.error("Error fetching teacher names", error);
      message.error("Failed to fetch teacher names.");
    }
  };

  const fetchAllocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation");
      setAllocations(response.data);
    } catch (error) {
      console.error("Error fetching allocations", error);
      message.error("Failed to fetch allocations.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation", values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        message.success("Allocation added successfully.");
        fetchAllocations();
        setShowForm(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding allocation", error);
      message.error("Failed to add allocation.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teacher_id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this allocation?",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation/${teacher_id}`);
          message.success("Allocation deleted successfully.");
          fetchAllocations();
        } catch (error) {
          console.error("Error deleting allocation", error);
          message.error("Failed to delete allocation.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const filteredAllocations = allocations.filter((item) =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div style={{ background: "#EAF2F8", padding: "20px", borderRadius: "8px" }}>
      <h2 style={{ color: "#2C3E50" }}>Teacher-Subject Scheduling</h2>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "20px", width: screens.xs ? "100%" : "300px" }}
      />

      <Button
        type="primary"
        onClick={() => setShowForm(true)}
        style={{ marginBottom: "20px", backgroundColor: '#2C3E50', width: screens.xs ? '100%' : 'auto' }}
      >
        Add Allocation
      </Button>

      <Modal
        title="Add New Allocation"
        open={showForm}
        onCancel={() => setShowForm(false)}
        footer={null}
        centered
        width={screens.xs ? "90%" : 600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="teacher_id" label="Teacher Name" rules={[{ required: true, message: "Teacher Name is required" }]}>
            <Select
              placeholder="Select Teacher"
              onChange={(value, option) => form.setFieldsValue({ teacher_name: option.children })}
            >
              {teacherNames.map((teacher) => (
                <Option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="teacher_name" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="subject_code" label="Subject Code" rules={[{ required: true, message: "Subject Code is required" }]}>
            <Input placeholder="Enter Subject Code" />
          </Form.Item>
          <Form.Item
            label="Subject Name"
            name="subject_name"
            rules={[{ required: true, message: 'Please select a subject!' }]}
          >
            <Select placeholder="Select Subject">
              {[
                "English", "Environmental Studies", "Mathematics", "Mother Tongue", "Computer Basics", "Science", "Social Studies",
                "Computer Applications", "General Awareness", "Language Skills", "Mathematics Basics", "Numbers and Shapes", "Rhymes and Stories"
              ].map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="class" label="Class" rules={[{ required: true, message: "Please select a class!" }]}>
            <Select placeholder="Select Class">
              {["1st", "2nd", "3rd", "4th", "5th", "UKG", "LKG"].map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2C3E50', flex: 1 }}>
              Add Allocation
            </Button>
            <Button type="default" danger onClick={() => setShowForm(false)} style={{ flex: 1 }}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>

      <Spin spinning={loading} tip="Loading...">
        <Table
          dataSource={filteredAllocations}
          bordered
          rowKey="teacher_id"
          pagination={{ pageSize: 5 }}
          style={{ marginTop: "20px" }}
          scroll={{ x: screens.xs ? 600 : 'auto' }
         
        }
        >
          <Table.Column title="Teacher Name" dataIndex="teacher_name" key="teacher_name" 
           onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}/>
          <Table.Column title="Subject Code" dataIndex="subject_code" key="subject_code"
           onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })} />
          <Table.Column title="Subject Name" dataIndex="subject_name" key="subject_name" 
           onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}/>
          <Table.Column title="Class" dataIndex="class" key="class" 
           onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}/>
          <Table.Column
            title="Actions"
            key="actions"
            onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
            render={(_, record) => (
              <Button type="default" danger onClick={() => handleDelete(record.teacher_id)}>
                Delete
              </Button>
            )}
          />
        </Table>
      </Spin>
    </div>
  );
};

export default TeacherSubjectAllocation;
