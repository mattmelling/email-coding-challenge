/**
 * Stub template module
 */

import Handlebars from 'handlebars';

export const load = name => Handlebars.compile(`
Test Template!

heading: {{heading}}
subtitle: {{subtitle}}
message: {{message}}
`);
