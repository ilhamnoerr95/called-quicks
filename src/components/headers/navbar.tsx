import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Navbar = () => (
    <>
        <Input
            style={{
                width: '100%',
                height: '58px',
                background: 'var(--color-primary-1)',
                border: 'var(--color-primary-1)',
                position: 'fixed',
            }}
            prefix={<SearchOutlined />}
        />
    </>
);

export default Navbar;
