import styled from 'styled-components';

export interface ColProps {
    size: any;
}

export const Grid = styled.div``;

export const Row = styled.div`
    display: flex;
`;

export const Col = styled.div`
    flex: ${(props: ColProps) => props.size};
`;
