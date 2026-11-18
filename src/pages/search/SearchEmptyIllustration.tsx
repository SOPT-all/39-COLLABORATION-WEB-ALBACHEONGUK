import emptyResultsImage from '../../assets/images/search/empty-results.png';

function SearchEmptyIllustration() {
  return (
    <div className="relative h-[194px] w-[187px] -translate-x-[19px] overflow-hidden bg-alba-white">
      <img
        src={emptyResultsImage}
        alt=""
        className="absolute top-0 left-[calc(50%+0.07px)] h-[209px] w-[187px] max-w-none -translate-x-1/2 object-cover"
      />
    </div>
  );
}

export default SearchEmptyIllustration;
