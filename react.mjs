let hooks = [];
let currentHook = 0;

// 호출 순서에 의지 currentHook을 return에서 하나 올려줬기 떄문에
const useState = (initialValue)=>{
    // 초기값이 할당된게 없다면 초기값 할당
    hooks[currentHook] = hooks[currentHook] || initialValue; // 호출 시점에 값이 없다면 initialValue를 넣어준다

    const hookIndex = currentHook; 

    function setState(newValue){
        hooks[currentHook] = newValue; // setState를 사용하면 newValue값을 _val 변경
    }
    return [hooks[currentHook++], setState];
}

let _deps = []
const useEffect = (callback, depArray)=>{
    const hasNoDeps = !depArray;
    const prevDeps = hooks[currentHook] ? hooks[currentHook].deps : undefined; // 이전 뎁스 값이 없다면 undefined
    const prevCleanUp = hooks[currentHook] ? hooks[currentHook].cleanUp : undefined;

    const hasChangDeps = prevDeps ? !depArray.every((el, i) => el === _deps[i]) : true;

    if (hasNoDeps || hasChangDeps){
        if(prevCleanUp) prevCleanUp(); // 이전 클린업 함수가 있다면 실행
        const cleanUp = callback(); // 현재 콜백의 반환 값은 밑에 전해준다
        hooks[currentHook] = { deps: depArray, cleanUp };
    }
    currentHook++;
};

const Myreact = {
    render(Component){
        const instance = Component();
        instance.render();
        currentHook = 0;
        return instance;
    },
};

Myreact.useState = useState;
Myreact.useEffect = useEffect;
export {useState, useEffect};
export default Myreact;