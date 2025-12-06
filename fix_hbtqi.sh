#!/bin/bash
# Fix HBTQI+ translations

# Cissexism - line 86794
sed -i '' '86794s/""/"التمييز ضد العابرين جنسياً"/' data.js

# Dragqueen - find and fix
sed -i '' '/Lexin032790/,/^\[/ { s/"HBTQI\."/{next}; /^[[:space:]]*"",$/ { N; s/""/"ملكة السحب (رجل يتقمص شخصية أنثوية للعرض)"/; q; } }' data.js

echo "HBTQI fixes applied"
