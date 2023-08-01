import styled from 'styled-components';

const StyledSection = styled.section`  
  .icon-input {
    margin-top: 2rem;
    height: 3.5rem;
    width: 36rem;
    border-radius: 0.5rem;
  }
  .user-list {
    width: min-content;
    margin-top: 2rem;
    max-height: 80%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }
    /* Track */
    &::-webkit-scrollbar-track {
      opacity: 1;
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: ${({theme}) => theme.colors.secondary1};
      border-radius: 0.25rem;
    }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: ${({theme}) => theme.colors.secondary2};
    }
    &::-webkit-scrollbar-corner {
      display: none;
    }
    
    p {
      font-family: 'Roboto Slab', monospace;
      font-size: 1.5rem;
      color: ${({theme}) => theme.colors.secondary2};
    }
    
    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      padding: 0.5rem 0;
      border-bottom: 1px solid ${({theme}) => theme.colors.primary3};
      transition: 0.15s;
      
      &:hover {
        cursor: pointer;
        font-weight: bold;
      }
      p {
        width: 12rem;
      }
      p:nth-child(3) {
        width: 20rem;
      }
    }
    .search-info {
      margin-top: 6rem;
      width: max-content;
    }
    
  }
`;

export default StyledSection;