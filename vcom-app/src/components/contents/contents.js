
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Contents() {
  return (
    <Container>
      <Stack direction='vertical' gap={4}>
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
    </Container>
  );
}

export default Contents;