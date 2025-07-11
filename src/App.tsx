// src/App.tsx


import BasicInput from './components/BasicInput.tsx';
import PDFView from './components/PDFView.tsx';
import './index.css'
function App() {
  
  return (
       
    <div className="container mx-auto mt-8 p-2 flex flex-col justify-center ">
      <BasicInput />
      <PDFView />
    </div>
  
  );
}

export default App;
