import styled from 'styled-components';

export interface ColProps {
    size: any;
}

export const Grid = styled.div``;

export const Row = styled.div`
    display: flex;
`;

export const CenteredRow = styled(Row)`
    margin: auto;
`;


export const Col = styled.div`
    flex: ${(props: ColProps) => props.size};
`;

export const CenteredCol = styled(Col)`
    flex: ${(props: ColProps) => props.size};
    margin: auto 0;
`;
