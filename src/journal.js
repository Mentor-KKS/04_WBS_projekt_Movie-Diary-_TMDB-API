// ==================== Imports ====================
import {
  renderWatchlist,
  setupFilterButtons,
  showLatestMovieDetail,
} from "./journal-ui.js";

import { renderHeader } from "./header.js";
import { renderFooter } from "./footer.js";

// ==================== Init ====================
renderHeader();
renderFooter();
showLatestMovieDetail();
renderWatchlist();
setupFilterButtons();
