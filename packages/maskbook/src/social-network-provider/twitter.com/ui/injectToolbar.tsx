import { LiveSelector, MutationObserverWatcher } from '@dimensiondev/holoflows-kit'
import { Toolbar } from '../../../components/InjectedComponents/Toolbar'
import { ToolbarPlaceholder } from '../../../components/InjectedComponents/ToolbarPlaceholder'
import { renderInShadowRoot } from '../../../utils/shadow-root/renderInShadowRoot'
import { startWatch } from '../../../utils/watcher'
import { twitterUrl } from '../utils/url'

const main = new LiveSelector().querySelector('body > noscript')
const leftMenuBlock = new LiveSelector().querySelector('[role="banner"] [role="heading"]')
const rightFormBlock = new LiveSelector().querySelector('[data-testid="sidebarColumn"] form[role="search"]')
const rightTrendingBlock = new LiveSelector().querySelector(
    '[data-testid="sidebarColumn"] > div[style] > div[style] + div > div',
)

export function injectToolbarAtTwitter() {
    if (location.hostname.indexOf(twitterUrl.hostIdentifier) === -1) return

    // inject placeholder into left column
    const menuBlockWatcher = new MutationObserverWatcher(leftMenuBlock.clone())
    startWatch(menuBlockWatcher)
    renderInShadowRoot(<ToolbarPlaceholder />, {
        shadow: () => menuBlockWatcher.firstDOMProxy.beforeShadow,
    })

    // inject placeholder into right column
    const formBlockWatcher = new MutationObserverWatcher(rightFormBlock.clone())
    startWatch(formBlockWatcher)
    renderInShadowRoot(<ToolbarPlaceholder expectedHeight={128} />, {
        shadow: () => formBlockWatcher.firstDOMProxy.beforeShadow,
    })

    // inject placeholder into right column
    const trendingBlockWatcher = new MutationObserverWatcher(rightTrendingBlock.clone())
    startWatch(trendingBlockWatcher)
    renderInShadowRoot(<ToolbarPlaceholder />, {
        shadow: () => trendingBlockWatcher.firstDOMProxy.beforeShadow,
    })

    // inject toolbar
    const mainWatcher = new MutationObserverWatcher(main.clone())
    startWatch(mainWatcher)
    renderInShadowRoot(<Toolbar />, {
        shadow: () => mainWatcher.firstDOMProxy.beforeShadow,
    })
}
