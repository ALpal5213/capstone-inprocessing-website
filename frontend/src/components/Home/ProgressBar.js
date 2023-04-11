import React from 'react';
// import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBar = () => {

    const instProg = 40;
    const unitProg = 20;
    const jobProg = 80;
    const persProg = 60;

    return (

        <div>
          <ProgressBar variant="success" now={instProg} label='Installation' />
          <ProgressBar variant="info" now={unitProg} label='Unit'/>
          <ProgressBar variant="warning" now={jobProg} label='Job'/>
          <ProgressBar variant="danger" now={persProg} label='Personal'/>
        </div>
      );


}

export default ProgressBar;