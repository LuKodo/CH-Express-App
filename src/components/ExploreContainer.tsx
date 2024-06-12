interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="d-flex justify-content-center">
      <strong>{name}</strong>
    </div>
  );
};

export default ExploreContainer;
