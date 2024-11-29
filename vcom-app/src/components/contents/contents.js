//import { Container } from "react-bootstrap";

import Stack from 'react-bootstrap/Stack';

function Contents() {
  return (
    <Stack direction='vertical' gap={3}>
      <Stack direction='horizontal' gap={2}>
        <div className="p-2">test</div>
        <div className="p-2">test2</div>
        <div className="p-2">test3</div>
      </Stack>  
      
      <Stack direction='horizontal' gap={2}>
        <div className="p-2">test</div>
        <div className="p-2">test2</div>
        <div className="p-2">test3</div>
      </Stack>

      <Stack direction='horizontal' gap={2}>
        <div className="p-2">test</div>
        <div className="p-2">test2</div>
        <div className="p-2">test3</div>
      </Stack>
    </Stack>
  );
}

export default Contents;