function panda(data = {
    targetEl,
    itemsView,
    itemsGap,
    speed,
    navigation,
    activeItem
}) {

    const itemsView = data.itemsView || 1
    const slidePerItem = data.slidesPerItem || 1
    const itemsGap = data.itemsGap || 0
    const activeItem = data.activeItem || 0



    const targetEl = document.getElementById(data.targetEl)
    const pandaWrapper = targetEl.firstElementChild
    const pandaItems = pandaWrapper.children
    const pandaWidth = targetEl.clientWidth


    const pandaItemsWidth = pandaWidth / (itemsView)
    const pandaItemsMargin = itemsGap || 0

    const setPandaItemsWidth = pandaItemsWidth - (pandaItemsMargin / data.itemsView)

    for (let i = 0; i < pandaItems.length; i++) {
        pandaItems[i].style.width = `${setPandaItemsWidth}px`
        pandaItems[i].style.marginRight = `${pandaItemsMargin}px`
    }

    pandaWrapper.style.transition = `all ${data.speed}ms ease-in-out`


    // Navigation Area ============
    const getPandaPrevBtn = document.querySelector(data.navigation.prevBtn)
    const getPandaNextBtn = document.querySelector(data.navigation.nextBtn)

    const pandaPrevBtn = getPandaPrevBtn
    const pandaNextBtn = getPandaNextBtn



    // Slide Moving Handler =============
    const slideTranslateXVale = slidePerItem * (setPandaItemsWidth + pandaItemsMargin)
    let slideTranslateX = 0

    const slideTranslator = (direction) => {

        if (direction === 'next') {
            slideTranslateX = slideTranslateX - slideTranslateXVale
            return slideTranslateX
        } else if (direction === 'prev') {
            slideTranslateX = slideTranslateX + slideTranslateXVale
            return slideTranslateX
        }

    }

    const slideMovingHandler = (slideValue) => {
        pandaWrapper.style.transform = `translate3d(${slideValue}px, 0, 0)`
    }

    // PandaItems active class Handler =======
    let activatedItem = 0
    pandaWrapper.children[activatedItem].classList.add('panda-item-active')
    const itemsActiveHandler = (setIndex) => {
        // const indexValue = setIndex * slidePerItem
        // console.log(indexValue)
        // if (indexValue < 1) {
        //     pandaWrapper.children[indexValue].classList.add('panda-item-active')
        // } else {
        //     pandaWrapper.children[indexValue - slidePerItem].classList.remove('panda-item-active')
        //     pandaWrapper.children[indexValue].classList.add('panda-item-active')
        // }

    }

    // Panda Prev Button Event
    pandaPrevBtn.addEventListener('click', () => {
        activatedItem = activatedItem - 1
        const lastItemActive = pandaWrapper.firstElementChild.classList.contains('panda-item-active')

        if (lastItemActive) {
            slideMovingHandler(0)
            itemsActiveHandler('reset')
            activatedItem = 0
        } else {
            itemsActiveHandler(activatedItem)
            slideMovingHandler(slideTranslator('prev'))
        }
    })

    // Panda Next Button Event
    pandaNextBtn.addEventListener('click', () => {

        activatedItem = activatedItem + 1
        const lastItemActive = pandaWrapper.lastElementChild.classList.contains('panda-item-active')

        if (lastItemActive) {
            slideMovingHandler(0)
            itemsActiveHandler('reset')
        } else {
            itemsActiveHandler(activatedItem)
            slideMovingHandler(slideTranslator('next'))
        }
    })


}