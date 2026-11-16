import noMatchImage from '../../assets/images/search/resume-no-match.png';

function SearchErrorIllustration() {
  return (
    <div className="relative h-[188px] w-[132px]">
      <img
        src={noMatchImage}
        alt=""
        className="absolute top-[8px] left-[4px] h-[172px] w-[125px] object-fill"
      />
    </div>
  );
}

export default SearchErrorIllustration;
