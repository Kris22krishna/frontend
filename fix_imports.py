import os
import re

dir_path = r'e:\LD\frontend\src\components\practice\grade-1'
files = [f for f in os.listdir(dir_path) if f.endswith('.jsx')]

for file in files:
    path = os.path.join(dir_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the lucide-react import line
    match = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"];', content)
    if match:
        imports_str = match.group(1)
        imports_list = [i.strip() for i in imports_str.split(',')]
        
        needs_update = False
        if 'Eye' not in imports_list:
            imports_list.append('Eye')
            needs_update = True
        if 'ChevronRight' not in imports_list:
            imports_list.append('ChevronRight')
            needs_update = True
            
        if needs_update:
            new_imports_str = ', '.join(imports_list)
            # Replace the old import block
            content = content.replace(match.group(0), f"import {{ {new_imports_str} }} from 'lucide-react';")
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Fixed imports for {file}')
            
print('Import patching complete.')
