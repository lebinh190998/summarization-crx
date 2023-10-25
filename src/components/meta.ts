import classNames from 'classnames';

const DEFAULT_CLASS_MAPPINGS = {
  flex: 'dodoFlex',
  flexJustified: 'dodoFlexJustified',
  flexCentered: 'dodoFlexCentered',
};

const propsToClasses =
  (propsToClassMappings: object) =>
  (props: { [x: string]: string | boolean | undefined }) => {
    const classMappings: { [x: string]: string | boolean } = {};

    const allMappings = {
      ...DEFAULT_CLASS_MAPPINGS,
      ...propsToClassMappings,
    };

    for (const [prop, className] of Object.entries(allMappings)) {
      if (props[prop]) {
        classMappings[className as string] = true;
      }
    }

    return classNames(classMappings);
  };

export { propsToClasses, DEFAULT_CLASS_MAPPINGS };
