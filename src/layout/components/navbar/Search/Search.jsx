import { useState } from 'react';
import { useNavigate } from 'react-router';

import { TbSearch } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setDoSearch } from '@/store/reducerStore';


const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [valueInput, setValueInput] = useState('');
    const [isShowInput, setIsShowInput] = useState(false);
    const [visibleIconSearch, setVisibleIconSearch] = useState(false);

    // bătqs đầu tìm kiếm
    const handleSearch = () => {
        if (!valueInput.trim().length) return
        dispatch(setDoSearch())
        navigate(`/search/${valueInput}`);
    };

    // sử lý khi nhập value input
    const handleChange = (e) => {
        if (e.target.value.startsWith(' ')) return setValueInput('');
        setValueInput(e.target.value);
    };

    return (
        <div className="relative mr-[12px]">
            
                <label htmlFor="search" className={`text-[#797979] text-[26px] cursor-pointer ${!isShowInput && !visibleIconSearch ? "visible" : "invisible"}`}>
                    <TbSearch onClick={() => {
                        setIsShowInput(true)
                        setVisibleIconSearch(true)
                    }} />
                </label>
            
                <div className={`h-[28px] border-[1px] transition-all ease-linear duration-[0.5s] overflow-hidden border-[#838383] absolute right-0 top-0 bottom-0 ${isShowInput ? "w-[220px] md:w-[300px]" :"w-0 border-transparent" }  xl:h-[30px] rounded-[50px]`}>
                    
                        <input
                        value={valueInput}
                        onChange={handleChange}
                        onKeyDown={e => {
                        if (e.key === "Enter") { 
                            handleSearch()
                        }
                        }}
                        type="text"
                        id="search"
                        className="w-[80%] md:w-[84%] ml-[12px] h-[100%] leading-[14px] md:ml-[12px] md:mr-[14px] outline-none bg-transparent placeholder:text-[12px] md:placeholder:text-[14px]"
                        placeholder="Nhập khóa tìm kiếm của bạn..."
                        />
                        
                    <div className="absolute top-[50%] translate-y-[-50%] right-[10px] cursor-pointer" onClick={handleSearch} >
                        <TbSearch />
                    </div>

                </div>
            
        </div>
    );
};

export default Search;
