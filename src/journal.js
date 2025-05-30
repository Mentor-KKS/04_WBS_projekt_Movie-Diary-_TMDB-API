// ==================== Imports ====================
import {
  renderWatchlist,
  setupFilterButtons,
  showLatestMovieDetail,
} from "./modules/components/journal-ui.js";

import { renderHeader } from "./modules/components/header.js";
import { renderFooter } from "./modules/components/footer.js";

// ==================== Init ====================
renderHeader();
renderFooter();
showLatestMovieDetail();
renderWatchlist();
setupFilterButtons();
