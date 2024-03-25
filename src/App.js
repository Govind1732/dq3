import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import AutoProfile from "./Pages/AutoProfile";
import AutoViewEdit from "./Pages/AutoViewEdit";
import RantDT from "./Pages/RantDT";
import RantDTViewEdit from "./Pages/RantDTViewEdit";
import CorpData from "./Pages/CorpData";
import CorpDataViewEdit from './Pages/CorpDataViewEdit'
import AllProjects from "./Pages/AllProjects";
import AllProjectsviewEdit from './Pages/AllProjectsviewEdit'
import MLProfile from "./Pages/MLProfile";
import MLProfileReports from "./Pages/MLProfileReports";

const App = () => {
  return (
    <>
      {/* <Container fluid className='d-flex flex-column overflow-hidden min-vh-100 px-0' style={style}>
          <Header />
          <div className="vh-100">
          <Row className=''>
            <Col xl={12}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/autoProfile' element={<AutoProfile />} />
                <Route path="/autoviewedit" element={<AutoViewEdit/>}/>
                <Route path='/rantdt' element={<RantDT />} />
                <Route path='/corpData' element={<CorpData />} />
                <Route path='/allProjects' element={<AllProjects />} />
                <Route path='/mlProfile' element={<MLProfile />} />
                <Route path="/mlProfileReports" element={<MLProfileReports/>}/>
              </Routes>
            </Col>
          </Row>
          </div>
          
          
          <Footer/>
        </Container> */}

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/autoProfile" element={<AutoProfile />} />
          <Route path="/autoviewedit" element={<AutoViewEdit />} />
          <Route path="/rantdt" element={<RantDT />} />
          <Route path="/rantdtviewedit" element={<RantDTViewEdit />} />
          <Route path="/corpData" element={<CorpData />} />
          <Route path="/corpDataviewedit" element={<CorpDataViewEdit />} />
          <Route path="/allProjects" element={<AllProjects />} />
          <Route path="/allProjectsviewedit" element={<AllProjectsviewEdit />} />
          <Route path="/mlProfile" element={<MLProfile />} />
          <Route path="/mlProfileReports" element={<MLProfileReports />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
