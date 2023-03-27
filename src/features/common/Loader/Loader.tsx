import './Loader.scss';

export function Loader() {
  return (
    <div className="c-loader">
      <div className="loader__spinner-ellipsis">
        <div className="loader__ellipsis-inner">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}
