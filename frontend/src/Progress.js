import React from 'react';

const Progress = () => {

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

export default Progress;